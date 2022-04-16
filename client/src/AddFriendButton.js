import React from 'react';

import Button1 from './Button1';
const additionalStyles={
    marginTop: '10px',
    marginleft: '5px',
    width: '80%',
    height: '30px',
    background: '#3ba55d'
}
const AddFriendButton=()=>{
    return(
        <div>
            <Button1
            additionalStyles={additionalStyles}
            label='AddFriend'
            />

        </div>
    );
};
export default AddFriendButton;