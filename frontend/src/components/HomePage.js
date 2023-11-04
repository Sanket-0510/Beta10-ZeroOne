import BottomSection from './BottomSection/Section';
import Navbar from './Navbar';
import TopSection from './TopSection/Section';
const appname = "FarmEasy";

function HomePage() {

    return (
        <>
            <Navbar title={appname} />
            <TopSection />
            <BottomSection />
        </>
    );
}

export default HomePage;
