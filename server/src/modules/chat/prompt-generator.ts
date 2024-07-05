export function generateSqlPrompt(
  dataSourceType: string,
  tableSchemas: Database.TableSchema[],
) {
  const sqlPrompt = `I will give you a list of ${dataSourceType} tables schemas in JSON format, and some instructions.
Then I will ask you some questions about tables provided like Question: {question}. You might need to join tables to answer the questions.

Below is the format:
  Table Schema: (JSON array)
  Instructions: (sentences)

Table Schema:
  ${JSON.stringify(tableSchemas)}

`;

  const instructions = `
Instructions:
  * The table in the where clause appear in the tables or temp tables you selected from.
  * Use FORMAT_DATE(), DO NOT use DATE_TRUNC().
  * Convert TIMESTAMP to DATE using DATE().
  * Use full column name including the table name.
  * You can ONLY read, cannot UPDATE or DELETE or MAKE ANY CHANGES to the data.
  * It is Okay to make assumptions to answer the question.
  * DO NOT use any field not included in schemas.
  * Keep the assumptions concise.
  * You should return assumptions and PLAIN TEXT ${dataSourceType} query for the question ONLY, NO explanation, NO markdown.
  * Use UNNEST() for ARRAY field.
  * Wrap table name with \`\`
  * NO content after the query.
  * Table name in the query should be without database name.

  Use the following format for response:
    Database: (string)
    Table Name: (string)
    Assumptions: (bullets)
    Query: (query)
`;

  return (
    sqlPrompt +
    instructions +
    '\n\nRespond I understand to start the conversation.'
  );
}

export function generateSqlPrompt_2(
  dataSourceType: string,
  tableSchemas: Database.TableSchema[],
) {
  const sqlPromptIntro = `I will give you a list of ${dataSourceType} tables schemas in JSON format. 
Please prepare to answer some questions about these tables. You might need to join tables to provide answers.`;

  const schemaDisplay = `Table Schema (JSON array):
${JSON.stringify(tableSchemas, null, 2)}`;

  const instructions = `
Instructions:
  - Ensure all WHERE clause conditions use tables or temp tables you've selected.
  - Use FORMAT_DATE(), avoid DATE_TRUNC() for date formatting.
  - Convert TIMESTAMP to DATE using DATE().
  - Always use the full column name, including the table name.
  - You are restricted to READ-only operations; no updates, deletions, or changes are allowed.
  - Make concise assumptions necessary to answer the question.
  - Reference only fields included in the schemas provided.
  - Queries should be plain SQL text only; do not add explanations or use markdown.
  - Use UNNEST() for handling ARRAY fields and wrap table names with backticks.
  - Do not include database names with table names in queries.
  - Format your response as follows:
      Database: (string)
      Table Name: (string)
      Assumptions: (listed)
      Query: (your SQL query here)
`;

  return `${sqlPromptIntro}\n${schemaDisplay}\n${instructions}\nRespond 'I understand' to start the conversation.`;
}

export function generateVegaPrompt(fields: Chat.Metadata[]) {
  const vegaPrompt = `You are the best assistant in the world for data visualization using vega-lite. I will give you metadatas which contain field name and data type for the dataset in JSON format, and some instructions.
And I will ask you some questions like Question: {question}. You should generate the vega-lite specification based on the question.

Below is the format:
  Instructions: (sentences)
  Metadatas: (JSON array)
`;
  const instructions = `Instructions:
  * You should return vega-lite specification for the question ONLY, NO explanation, NO markdown.
  * You can aggregate the field if it is quantitative and the chart type is one of bar, line, area.
  * You need to use more than one field in the metadatas for encoding field.
  * Do not ask for more information.
  * You can make assumptions to answer the question.
  * You can use any chart type and encoding.
  * You can image the data depends on the metadatas.

  Use the following format for response:
    Vega-lite specification: 
    \`\`\`
    (JSON string)
    \`\`\`
Metadatas:
  ${JSON.stringify(fields)}
    `;

  return (
    vegaPrompt +
    instructions +
    '\n\nRespond I understand to start the conversation.'
  );
}

export function generateVegaPrompt_2(fields: Chat.Metadata[]) {
  const vegaPromptIntro = `You are tasked with creating data visualizations using vega-lite. Below are the metadata containing field names and data types for the dataset in JSON format. 
Please prepare to generate a vega-lite specification based on the forthcoming question.`;

  const metadataDisplay = `Metadatas (JSON array):
${JSON.stringify(fields, null, 2)}`;

  const instructions = `Instructions:
  - Provide the vega-lite specification based on the question only; no additional explanations or markdown.
  - Aggregate fields if quantitative and the chart type permits (e.g., bar, line, area).
  - Use multiple fields from the metadata for field encoding.
  - Do not request further information.
  - Assumptions about the data are permitted.
  - Utilize any suitable chart type and encoding options.
  - Format your response as:
    Vega-lite specification: 
    \`\`\`
    (your vega-lite JSON here)
    \`\`\`
`;

  return `${vegaPromptIntro}\n${metadataDisplay}\n${instructions}\nRespond 'I understand' to start the conversation.`;
}
