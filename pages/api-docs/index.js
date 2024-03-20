import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDocs = () => (
  <SwaggerUI url="/api/docs" />
);

export default ApiDocs;
