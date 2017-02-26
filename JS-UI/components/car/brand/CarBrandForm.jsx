import React, {Component, PropTypes} from 'react';
import {
    FlatButton,
    Dialog,
    TextField,
    SelectField,
    MenuItem
} from 'material-ui';
import {carBrandFieldsMap, carBrandRequiredFieldList} from '../../../constants/constants';
import * as V from '../../../utils/validation';

class carBrandForm extends Component {

    properties() {
        return this.props.properties;
    }

    actions() {
        return this.props.actions;
    }

    getValidations = (fieldName) => {
        return this.properties().validations.filter((v) => {
            return v.fieldName === fieldName
        })
    };

    focus(fieldName) {
        const f = this[fieldName];
        f ? f.focus() : f
    }

    text(fieldName, validateFields, focusField) {
        const filtered = this.getValidations(fieldName);
        const info = carBrandFieldsMap.get(fieldName);
        const mc = V.getMainColor(filtered);
        const hintText = "";
        return (
            <TextField
                ref={(ref) => this[fieldName] = ref}
                hintText={hintText}
                floatingLabelFixed={true}
                floatingLabelText={info.title}
                onChange={(e) => {
                    const v = e.target.value;
                    this.actions().update(fieldName, v)
                }}
                onBlur={(e) => this.actions().validate(validateFields)}
                onKeyDown={((e) => {
                    if (e.keyCode === 13)
                        this.focus(focusField)
                })}
                value={this.properties().carBrand[fieldName]}
                errorText={V.errorText(filtered)}
                errorStyle={mc}
                floatingLabelStyle={mc}
                multiLine={true}
                hintStyle={V.getSecondaryColor(filtered)}
            />
        )
    }

    selector(fieldName, items) {
        const filtered = this.getValidations(fieldName);
        const info = carBrandFieldsMap.get(fieldName);
        const mc = V.getMainColor(filtered);
        //items = this.actions().rest.carTypes;
        console.log('items');

        console.log(items);
        return (
            <SelectField
                ref={(ref) => this[fieldName] = ref}
                floatingLabelFixed={true}
                floatingLabelText={info.title}
                floatingLabelStyle={mc}
                onChange={(event, index, value) => {
                    this.actions().update(fieldName, value)
                }}
                value={this.properties().carBrand[fieldName]}>
                {items.map(el => {
                    return <MenuItem value={el.id} key={el.id} primaryText={el.name} />;
                })}
            </SelectField>
        )
    }

    render() {
        const actions = [
            <div>
                <FlatButton
                    label="Сохранить"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={() => {
                        this.actions().validate(carBrandRequiredFieldList.toArray());
                        if(!this.properties().validations.find((v) => {return v.level === 'error'}))
                            this.actions().rest.push();
                    }}
                />
            </div>
        ];

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                open={this.properties().isOpen}
                autoDetectWindowHeight={true}
                onRequestClose={this.actions().close}
                autoScrollBodyContent={true}>
                <div>
                    {this.selector(
                        "type",
                        [{id: "PERSON", name: "Частное лицо"}, {id: "LEGAL", name: "Компания"}]
                        //this.actions().rest.carTypes
                    )}<br/>
                    {this.text("name", ["name"], "name")}<br/>
                </div>
            </Dialog>
        );
    }
}

carBrandForm.propTypes = {
    title: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default carBrandForm;