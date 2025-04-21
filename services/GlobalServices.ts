import axios from "axios"
import { PollyClient, SynthesizeSpeechCommand, VoiceId } from "@aws-sdk/client-polly";

export const getToken = async()=> {
    const result = await axios.get('/api/getToken');

    return  result.data;
}



export const ConvertTextToSpeech = async (text: string | null, expertName: string | undefined) => {

    // console.log(text, expertName);
    
    const pollyClient = new PollyClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_KEY || ""
      }
    });
  
    const command = new SynthesizeSpeechCommand({
      Text:text as string,
      OutputFormat: "mp3",
      VoiceId: expertName as VoiceId
    })
  
    try {
      const { AudioStream } = await pollyClient.send(command);
  
      if (AudioStream) {
          const audioArrayBuffer = await AudioStream.transformToByteArray();
          const audioBlob = new Blob([audioArrayBuffer], {type: 'audio/mp3'});
          const audioUrl = URL.createObjectURL(audioBlob);
          console.log(audioUrl);
          
          return audioUrl;
      } else {
          console.error("AudioStream is undefined.");
          return null;
      }
  
  } catch (e) {
      console.log(e);
  }
  
  
  };