import './styles/App.css';
import PostList from './components/postList';
import { useState } from 'react';
import PostForm from './components/postForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aa', body: 'бб' },
    { id: 2, title: 'rr', body: 'аа' },
    { id: 3, title: 'bb', body: 'яя' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function getSortedPosts(params) {
    if (selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }

  const sortedPosts = getSortedPosts();

  // Получаем пост от дочерного элемента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  //тут мы вызываем колбэк функцию где передаем пропсы в родительский элемент вместо дочернего
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          option={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
      {posts.length !== 0 ? (
        <PostList remove={removePost} title="Список Постов" posts={sortedPosts} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      )}
    </div>
  );
}

export default App;
