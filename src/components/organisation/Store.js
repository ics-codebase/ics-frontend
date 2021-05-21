import React, {useEffect} from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../hooks/use-stores';

const Store = observer(() => {
    const { organisationStore } = useStores();
    
    return(
    
        JSON.stringify(organisationStore)


    )
        
});


export default Store;
