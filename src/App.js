import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { Post } from './Components/Post';
import { loadPosts } from './Utils/loadPosts';

class App extends Component{
  
  state = {
    posts: []
  };
  componentDidMount(){
    //this.handleTimeOut();
    //this.loadPosts();
    this.loadPosts();
    /*
    var lista = [
      'Marcio',
      'Josilene',
      'Emanoel'
    ]
    {
    
    
    }
    
        //Destructuring de array, pega o primeiro valor
    var [teste] =  lista;
    console.log(teste)*/
  }
 
  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({posts: postsAndPhotos});

  }
  handleTimeOut = () => {
    setTimeout(()=>{
      //this.setState(this.state.posts = [{id: 1, title: 'blablabla', body: 'sdisajidjas'}])
      
      const { posts, counter } = this.state;
      posts[0].title = 'O título mudou'
      this.setState({ posts, counter: counter + 1})
    }, 15)
  }

  componentDidUpdate(){
    //this.handleTimeOut();
  }
  
  render() {
    const { posts } = this.state;
    return(
      <section className='container'>
        <div className='posts'>
          {posts.map(post => (
              <Post key={post.id} post={post} />
          ))}
        </div>
      </section>
    );
  }
}
export default App;
