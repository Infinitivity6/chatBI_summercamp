import { ChatGPTAPI, type ChatMessage } from '@aigcaas/chatgpt';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { envs } from '../../config/envs.js';
import * as AigcaasUtils from '../../utils/aigcaas.js';

// 应用配置常量
const appConfig = {
  applicationName: 'chatgpt_chat',
  apiName: 'chat_com',
};

// 使用模板字符串构建基础URL，提高可读性
const baseUrl = `https://api.aigcaas.cn/product/${appConfig.applicationName}/api/${appConfig.apiName}`;

export class Aigcaas {
  private readonly logger = new Logger(Aigcaas.name);
  private api: ChatGPTAPI | undefined = undefined;

  // 初始化 API，设置必要的参数
  public async init() {
    this.api = new ChatGPTAPI({
      isAigcaas: true,
      aigcaasSecretId: envs.AIGCAAS_SECRET_ID,
      aigcaasSecretKey: envs.AIGCAAS_SECRET_KEY,
      completionParams: {
        temperature: 0, // 设置 AI 响应的一致性温度
      },
    });
  }

  // 向 ChatGPT API 发送消息并记录响应
  public async sendMessage(
    message: string,
    parentMessageId: string | undefined = undefined,
  ): Promise<ChatMessage> {
    const response = await this.api.sendMessage(message, {
      parentMessageId,
    });

    // 记录响应用于调试目的
    this.logger.debug(`Aigcaas response: ${JSON.stringify(response)}`);
    return response;
  }

  // 向 AI 服务提交聊天完成请求并处理签名
  public async chatCompletion(
    messages: Chat.ChatgptMessage[],
  ): Promise<Chat.IChatgptResponse> {
    // 使用工具函数签名头部，保证通信安全
    const signHeaders = AigcaasUtils.sign({
      secretId: envs.AIGCAAS_SECRET_ID,
      secretKey: envs.AIGCAAS_SECRET_KEY,
    });

    // 使用 POST 请求向 AI 服务发送消息
    const response = await axios.post<Chat.IChatgptResponse>(
      baseUrl,
      {
        original_response: 'true', // 确保响应保持原始格式
        messages: messages,
      },
      {
        headers: signHeaders, // 附加签名的头部确保安全
      },
    );

    // 直接返回响应数据部分
    return response.data;
  }
}

// 导出类实例以便在应用程序其他地方使用
const aigcaas = new Aigcaas();
export { aigcaas };
