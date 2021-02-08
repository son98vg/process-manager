from flask import jsonify, request, make_response
from application import app, db
from application.models import Process, DockerManager
from flask_jwt import current_identity
from flask_cors import cross_origin


@app.route("/process", methods=["GET"])
@cross_origin()
def get_all_process():
    try:
        processes = Process.query.all()
        items = [
            {
                "id": process.id,
                "name": process.name,
                "pid": process.pid,
                "cmd": process.cmd,
                "config": process.config,
                "docker_id": process.docker_id,
                "ip": process.ip,
                "mac": process.mac,
                "status": process.status,
                "device_id": process.device_id,
                "type": process.type

            } for process in processes
        ]
        return jsonify(items)
    except:
        return make_response("Query error", 500)



@app.route('/dockerManager', methods=["GET"])
@cross_origin()
def get_info_docker():
    try:
        dockers = DockerManager.query.all()
        items = [
            {
                "id": docker.id,
                "ip": docker.ip,
                "mac": docker.mac,
                "docker_id": docker.docker_id,
                "docker_name": docker.docker_name,
                "port_local": docker.port_local,
                "port_forward": docker.port_forward
            } for docker in dockers
        ]
        return jsonify(items)
    except:
        return make_response("Query error", 500)


@app.route('/dockerManager/<int:id>', methods=["GET"])
@cross_origin()
def getone_info_docker(id):
    try:
        docker = DockerManager.query.get(id)
        return jsonify({
        
                "id": docker.id,
                "ip": docker.ip,
                "mac": docker.mac,
                "docker_id": docker.docker_id,
                "docker_name": docker.docker_name,
                "port_local": docker.port_local,
                "port_forward": docker.port_forward
        })
    
    except:
        return make_response("Query error", 500)
@app.route('/dockerManager', methods=["POST"])
@cross_origin()
def insert_docker():
   
    try:
        ip = request.json["ip"]
        mac = request.json["mac"]
        docker_id = request.json["docker_id"]
        docker_name = request.json["docker_name"]
        port_local = request.json["port_local"]
        port_forward = request.json["port_forward"]
        docker = DockerManager(mac, docker_id, docker_name, port_local, port_forward)
        db.session.add(docker)
        db.session.commit()
        return jsonify({
            "id": docker.id
        })
    except:
        return make_response("Create error",500)


@app.route('/dockerManager/<int:id>', methods=["PUT"])
@cross_origin()
def update_docker(id):
    try:
        ip = request.json["ip"]
        mac = request.json["mac"]
        docker_id = request.json["docker_id"]
        docker_name = request.json["docker_name"]
        port_local = request.json["port_local"]
        port_forward = request.json["port_forward"]

        query = DockerManager.query.filter(
            DockerManager.id != id,
            DockerManager.mac == mac,
        ).all()
        if len(query) > 0:
            return make_response("Process existed", 500)
        
        docker = DockerManager.query.get(id)
        docker.ip = ip
        docker.mac = mac
        docker.docker_id = docker_id
        docker.docker_name = docker_name
        docker.port_local = port_local
        docker.port_forward = port_forward
        db.session.commit()
        return jsonify({
            "id": id
        })
    except:
        return make_response("Not update", 500)


@app.route('/dockerManager/<int:id>', methods=["DELETE"])
@cross_origin()
def delete_docker(id):
    try:
        docker = DockerManager.query.get(id)
        if docker is None:
            return make_response("Docker not existed", 500)
        db.session.delete(docker)
        db.session.commit()
        return jsonify({
            "id": id
        })
    except:
        return make_response("Delete error",500)
