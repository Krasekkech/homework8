import styles from './App.module.css'
import {useState, useEffect} from "react";
import {UpdatedListItem} from "./components/ListItem";

const Elements = Array.from({ length: 100000 }).map((_, index) => index);

function App() {
    const [showList, setShowList] = useState(false);

    const handleShowList = () => {
        setShowList(!showList);
    };

    const [Blocks, setBlocks] = useState<number[]>(
        Elements.slice(0, 2),
    );


    useEffect(() => {
        if (showList) {
            setBlocks(Elements.slice(0, 2));
        } else {
            setBlocks([]);
        }
    }, [showList]);

    return (
        <div className={styles.layout}>
            <button onClick={handleShowList}>
                {!showList ? "Показать" : "Скрыть"} список
            </button>

            {showList &&
                Blocks.map((item) => (
                    <UpdatedListItem
                        showList={showList}
                        elements={Elements}
                        key={item}
                        item={item}
                        setBlocks={setBlocks}
                        Blocks={Blocks}
                    />
                ))}
        </div>
    );

}
export default App
