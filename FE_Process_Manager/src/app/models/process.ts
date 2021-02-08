export interface Process {
  cmd: string;
  name: string;
  config: string;
  device_id: string;
  docker_id: number;
  id: number;
  ip: string;
  mac: string;
  pid: number;
  type: string;
  status: boolean;
}
