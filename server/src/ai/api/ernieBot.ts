import axios from 'axios';
import { Logger } from '@nestjs/common';
import { envs } from '../../config/envs.js'; // 确保有正确的路径引用环境变量配置文件

export class Hitokoto {
  private readonly logger = new Logger(Hitokoto.name);

  // 方法：获取文心一言
  public async getHitokoto(): Promise<string> {
    try {
      // 使用环境变量中的基址和密钥
      const url = `${envs.HITOKOTO_API_BASE_URL}`;
      const response = await axios.get(url, {
        params: {
          c: 'a', // 可根据需要选择不同类别
          apiKey: envs.HITOKOTO_API_KEY, // 使用 API 密钥
        },
      });

      // 日志记录响应
      this.logger.debug(`Hitokoto response: ${JSON.stringify(response.data)}`);

      // 返回一言内容
      return response.data.hitokoto; // 从响应中提取一言文本
    } catch (error) {
      // 错误处理：记录错误并可能抛出异常
      this.logger.error('Failed to retrieve hitokoto', error);
      throw error;
    }
  }
}

// 导出类实例以便在应用程序其他地方使用
const hitokoto = new Hitokoto();
export { hitokoto };
