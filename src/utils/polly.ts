import { PollyClient } from "@aws-sdk/client-polly";

export const pollyClient = new PollyClient({
  region: "ap-northeast-2", // 서울 리전
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
});
