import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const FormField = ({ formdata, id, change }) => {
    const showError = () => {
        let errorMessage = <div>
            {
                formdata.validation && !formdata.valid ?
                    formdata.validationMessage : null
            }
        </div>
        return errorMessage
    }
    const renderTemplate = () => {
        let formTemplate = null;
        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        <TextField
                            id="outlined-name"
                            label={formdata.config.label}
                            value={formdata.value}
                            onChange={(event) => change({ event, id })}
                            type={formdata.config.type}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label={formdata.config.label}
                            value={formdata.value}
                            onChange={(event) => change({ event, id })}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        >
                            {formdata.config.options.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {showError()}
                    </div>
                )
                break;
            case ('input_multiline'):
                formTemplate = (
                    <div>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            rows='8'
                            label={formdata.config.label}
                            value={formdata.value}
                            onChange={(event) => change({ event, id })}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                        {showError()}
                    </div>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;

    }
    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;