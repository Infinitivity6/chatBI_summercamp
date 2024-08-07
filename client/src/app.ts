// 运行时配置

import { RequestConfig } from '@umijs/max';
import './global.less';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'ChatBI2.0' };
}

export const layout = () => {
  return {
    logo: 'https://cdn.icon-icons.com/icons2/2817/PNG/512/ai_artificial_intelligence_robot_chip_brain_technology_icon_179495.png',
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  // timeout 10 mins
  timeout: 600000,
  baseURL: 'http://localhost:3000',
  // other axios options you want
  errorConfig: {
    errorHandler() {
      // noop
    },
    errorThrower() {
      // noop
    },
  },
  requestInterceptors: [],
  responseInterceptors: [],
};
