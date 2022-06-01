import { FormControl, Modal, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { ReactElement, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { add, edit, IToy } from '../../features/toys/toysSlice';
import Select from '@mui/material/Select';
import { ToyTypes } from '../../features/toys/Toys.constants';
import { Box, Button, InputLabel, MenuItem, TextField } from '@mui/material';
import styles from './ToyModal.module.css';
import { useForm } from 'react-hook-form';
import { capitalizeOnlyFirstLetter } from '../../util/capitalize';

interface IToyModal {
    toy?: IToy,
    modalOpen: boolean,
    setModalOpen: (state: boolean) => void,
}

export const ToyModal = ({ toy, modalOpen, setModalOpen }: IToyModal): ReactElement => {

    const [toyName, setToyName] = useState(toy?.name || '');
    const [toyType, setToyType] = useState(toy?.type || '0')
    const [toyDescription, setToyDescription] = useState(toy?.description || '')

    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleClose = () => {
        setModalOpen(false);
    };

    const updateToy = () => {
        dispatch(edit({
            ...toy,
            name: toyName,
            type: toyType,
            description: toyDescription,
        }));
    }

    const createToy = () => {
        dispatch(add({
            id: nanoid(),
            name: toyName,
            type: toyType,
            description: toyDescription,
        }))
    }

    const handleConfirmButton = () => {
        if (toy?.id) {
            updateToy();
        } else {
            createToy();
        }

        setModalOpen(false)
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
        >
            <form className={styles.container} onSubmit={handleSubmit(handleConfirmButton)} >

                <h2>{toy?.id ? 'Edit Toy' : 'Create Toy'}</h2>

                <Box paddingBottom={2}>
                    <TextField
                        {...register('name', {
                            required: 'Name is required',
                            maxLength: 18,
                        })}
                        required
                        label="Name"
                        variant="standard"
                        value={toyName}
                        onChange={newValue => setToyName(newValue.target.value)}
                        inputProps={{ maxLength: 18 }}
                    />
                </Box>

                <Box paddingBottom={2}>
                    <FormControl fullWidth>
                        <InputLabel>Type:</InputLabel>
                        <Select
                            {...register('type', {
                                required: 'Type is required'
                            })}
                            required
                            defaultValue="0"
                            id="type"
                            value={toyType}
                            label="Type"
                            onChange={(event) => setToyType(event.target.value)}
                        >
                            <MenuItem value={ToyTypes.ANIMAL}>{capitalizeOnlyFirstLetter(ToyTypes[ToyTypes.ANIMAL])}</MenuItem>
                            <MenuItem value={ToyTypes.PUZZLE}>{capitalizeOnlyFirstLetter(ToyTypes[ToyTypes.PUZZLE])}</MenuItem>
                            <MenuItem value={ToyTypes.ELECTRONIC}>{capitalizeOnlyFirstLetter(ToyTypes[ToyTypes.ELECTRONIC])}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box paddingBottom={2}>
                    <TextField
                        {...register('description', {
                            maxLength: 100
                        })}
                        id="description"
                        fullWidth
                        label="Toy description"
                        value={toyDescription}
                        onChange={newValue => setToyDescription(newValue.target.value)}
                        multiline
                        rows={3}
                        inputProps={{ maxLength: 100 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleClose} sx={{ mt: 3, ml: 1 }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Confirm
                    </Button>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography sx={{ color: 'red' }}>
                        {errors.type && errors.type.message}
                        <br />
                        {errors.name && errors.name.message}
                    </Typography>
                </Box>
            </form>
        </Modal>
    );
};
