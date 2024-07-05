import { Layout, Row, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
}

const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <Layout>
      <Row justify="start">
        {' '}
        <div style={{ width: '100%' }}>
          <Typography.Title level={3} className={styles.title}>
            欢迎使用 <strong>{name}</strong>！
          </Typography.Title>
          <ul className={styles.guideList}>
            <li className={styles.guideItem}>
              <span className={styles.guideItemNum}>1:</span>
              <span className={styles.guideText}>点击左侧查询</span>
            </li>
            <li className={styles.guideItem}>
              <span className={styles.guideItemNum}>2:</span>
              <span className={styles.guideText}>
                输入你的问题（目前仅引入了顾客、产品、办公室、产品线四张表，请提这些相关问题）
              </span>
            </li>
            <li className={styles.guideItem}>
              <span className={styles.guideItemNum}>3:</span>
              <span className={styles.guideText}>
                AI会根据你的问题判断是否能查询相关数据表格，如果能，还会生成一种风格的表格（可自选）
              </span>
            </li>
          </ul>
        </div>
      </Row>
    </Layout>
  );
};

export default Guide;
