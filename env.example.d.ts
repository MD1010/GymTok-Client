declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_API_ENPOINT: string; // http://{local_ip}:{server_port}
    VIDEO_SERVER_ENDPOINT: string;
    FACEBOOK_APP_ID: string;
    GOOGLE_ANDROID_CLIENT_ID: string;
    GOOGLE_IOS_CLIENT_ID: string;
  }
}
