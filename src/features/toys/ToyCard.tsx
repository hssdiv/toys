import { ReactElement } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IToy, remove } from './toysSlice';
import { useAppDispatch } from '../../app/hooks';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Toys.module.css';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { ToyTypes } from './Toys.constants';
import { capitalizeOnlyFirstLetter } from '../../util/capitalize';

interface IToyCard {
    toy: IToy,
    handleOpen: (toy: IToy) => void,
}

export const ToyCard = ({ toy, handleOpen }: IToyCard): ReactElement => {

    const dispatch = useAppDispatch();

    return (
        <div className={styles.cardContainer}>
            <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardContent
                    sx={{
                        flex: 1,
                        justifyContent: 'space-between',
                        width: '60%',
                    }}
                >
                    <Typography component="h2" variant="h5" textAlign="left">
                        {toy.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" textAlign="left">
                        {capitalizeOnlyFirstLetter(ToyTypes[Number(toy.type)])}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        paragraph
                        textAlign="left"
                        textOverflow='ellipsis'
                        sx={{
                            wordWrap: 'break-word'
                        }}
                    >
                            {toy.description}
                    </Typography>
                </CardContent>
                <Button sx={{ height: 50 }} onClick={() => handleOpen(toy)}>
                    <EditIcon />
                </Button>
                <Button sx={{ height: 50, color: 'red' }} onClick={() => dispatch(remove(toy.id))}>
                    <RemoveCircleOutlineIcon />
                </Button>
            </Card>
        </div >
    );
};
