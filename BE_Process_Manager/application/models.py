from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, Boolean
from application import db

Base = db.Model

class Process(Base):
    __tablename__='process'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    pid = Column(Integer)
    cmd = Column(String)
    config = Column(String)
    cwd = Column(String)
    docker_id = Column(Integer)
    device_id = Column(String)
    ip = Column(String)
    mac = Column(String)
    status = Column(Boolean)
    type = Column(String)
    def __init__(self, name, pid, cmd, config, cwd, docker_id, device_id, ip, mac, status, type):
        self.name = name
        self.pid = pid
        self.cmd = cmd
        self.config = config
        self.cwd = cwd
        self.docker_id = docker_id
        self.device_id = device_id
        self.ip = ip
        self.mac = mac
        self.status = status
        self.type = type

class DockerManager(Base):
    __tablename__="DockerManager"
    id = Column(Integer, primary_key=True)
    ip = Column(String)
    mac = Column(String)
    docker_id = Column(Integer)
    docker_name = Column(String)
    port_local = Column(Integer)
    port_forward = Column(Integer)
    def __init__(self, mac, docker_id, docker_name, port_local, port_forward):
        self.ip = ip
        self.mac = mac
        self.docker_id = docker_id
        self.docker_name = docker_name
        self.port_local = port_local
        self.port_forward = port_forward

