import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import Iframe from 'react-iframe'

const ModalInfo = (props) => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


	return (
<>

    <p className="learnboutthissec">
      <a href='#' onClick={handleShow}>Before you answer, learn more here</a>
    </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
 
            <Iframe url={props.url}
                width="718px"
                height="800px"
                id="myId"
                className="myClassname"
                styles={{'border': 'none'}}/>

        </Modal.Body>

        <Modal.Footer>

          <button class="modalinfobutton" variant="primary" onClick={handleClose}>
            Close
          </button>

        </Modal.Footer>
      </Modal>
    </>
	);
};

export default ModalInfo;
