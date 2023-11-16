import { NavigationContainer } from '@react-navigation/native';
import BadgerTabs from './navigation/BadgerTabs';
import { ArticleFilterProvider } from './filterContext';



export default function BadgerNews(props) {

  return (
    <>
    <ArticleFilterProvider>
      <NavigationContainer>
        <BadgerTabs />
      </NavigationContainer>
    </ArticleFilterProvider>
    </>
  );
}