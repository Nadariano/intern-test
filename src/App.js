import Body from './components/body/main';
import Footer from './components/footer/main';
import Header from './components/header/main';

export default function App() {
  return (
    <div className="max-h-full flex flex-col">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}
