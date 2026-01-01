import React from 'react';
import { Helmet } from 'react-helmet-async';

interface JsonLdScriptProps {
  data: object | object[];
}

export const JsonLdScript: React.FC<JsonLdScriptProps> = ({ data }) => {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </Helmet>
  );
};

export default JsonLdScript;
