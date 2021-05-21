import React, {useEffect} from 'react';
import PracticesModal from './PracticesModal';
import { observer } from 'mobx-react';
import organisationService from '../../services/organisation';
import { useStores } from '../../hooks/use-stores';

const Test = observer(() => {
    const { organisationStore } = useStores();
    
    const change = () => {
        organisationStore.organisation.practices[0].name = 'cheagned'
        organisationStore.testname = 'chengnegefe'
    }


    useEffect(() => {
        organisationStore.refreshFromArchive()
      });



    return(
    
        organisationStore.organisation.practices.map((i) => (


            <p key={i._id}>
                NAME: {organisationStore.testname} 
                <br/>
                {i.name}
                <button onClick={change}>Change </button>
            </p>
        ))

    )
        
});


export default Test;
