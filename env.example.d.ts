declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_ENDPOINT: string; // http://{local_ip}:{server_port}
    VIDEO_SERVER_ENDPOINT: string;
  }
}
