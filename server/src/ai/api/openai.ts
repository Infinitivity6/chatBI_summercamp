import { ChatGPTAPI, type ChatMessage } from '@aigcaas/chatgpt';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { envs } from '../../config/envs.js';

export class OpenAI {
  private readonly logger = new Logger(OpenAI.name);
  private api: ChatGPTAPI | undefined = undefined;

  public async init() {
    this.api = new ChatGPTAPI({
      apiBaseUrl: `${envs.OPENAI_API_BASE_URL}/v1`,
      apiKey: envs.OPENAI_API_KEY,
      completionParams: {
        temperature: 0,
      },
    });
  }

  async sendMessage(
    message: string,
    parentMessageId: string | undefined = undefined,
  ): Promise<ChatMessage> {
    try {
      const response = await this.api.sendMessage(message, {
        parentMessageId,
      });
      return response;
    } catch (error) {
      this.logger.error('发送消息失败，请检查网络！', error);
      throw new Error('发送消息失败异常！');
    }
  }

  async chatCompletion(
    messages: Chat.ChatgptMessage[],
  ): Promise<Chat.IChatgptResponse> {
    const url = `${envs.OPENAI_API_BASE_URL}/v1/chat/completions`;
    try {
      const response = await axios.post<Chat.IChatgptResponse>(
        url,
        {
          model: 'gpt-3.5-turbo',
          temperature: 0.05,
          messages: messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + envs.OPENAI_API_KEY,
          },
        },
      );
      return response.data; // 确保返回正确的内容
    } catch (error) {
      this.logger.error('获取chatCompletion失败', error);
      throw new Error('chatCompletion获取失败异常');
    }
  }
}

const openAI = new OpenAI();
export { openAI };
