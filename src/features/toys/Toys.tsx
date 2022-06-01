import { ReactElement, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectToys, IToy, fillWithRandomData } from './toysSlice';
import AddIcon from '@mui/icons-material/Add';
import { ToyModal } from '../../components';
import { ToyCard } from './ToyCard';
import { Fab } from '@mui/material';

export const Toys = (): ReactElement => {

    const toys = useAppSelector(selectToys);

    const dispatch = useAppDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedToy, setSelectedToy] = useState<IToy>();

    const handleOpen = (toy?: IToy) => {
        setSelectedToy(toy)
        setModalOpen(true);
    }

    const fillWithRandom = () => {
        dispatch(fillWithRandomData({}))
    }

    return (
        <div>
            <p>Toys total: {toys.length}</p>
            
            {toys.map(toy => (
                <ToyCard
                    key={toy.id}
                    toy={toy}
                    handleOpen={handleOpen}
                />
            ))}
            <br />
            <Fab
                color="primary"
                aria-label="add"
                variant="extended"
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 50,
                }}
                onClick={() => handleOpen()}
            >
                <AddIcon sx={{ mr: 1 }} />
                Create
            </Fab>

            <Fab
                color="primary"
                aria-label="add"
                variant="extended"
                sx={{
                    position: 'fixed',
                    bottom: 50,
                    left: 50,
                }}
                onClick={() => fillWithRandom()}
            >
                Fill list with random toys
            </Fab>

            {modalOpen && <ToyModal
                toy={selectedToy}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />}
        </div >
    );
};
