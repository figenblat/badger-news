import React, { createContext, useContext, useState } from 'react';

const ArticleFilterContext = createContext();

export const ArticleFilterProvider = ({ children }) => {
  const [filteredArticles, setFilteredArticles] = useState([]);

  return (
    <ArticleFilterContext.Provider value={{ filteredArticles, setFilteredArticles }}>
      {children}
    </ArticleFilterContext.Provider>
  );
};

export const useArticleFilter = () => useContext(ArticleFilterContext);
