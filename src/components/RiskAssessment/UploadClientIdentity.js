import React, { Fragment, useState, useCallback, useMemo } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import exclamation from "assets/img/exclamation.svg";
import * as Service from "components/Service/SimpleService";
import { endPoints } from "config/appConfig";

const App = (props) => {
  const [processing, setProcessing] = useState(false); // <boolean>
  const [errors, setErrors] = useState({
    PICTURE_ID: null,
    PROOF_OF_ADDRESS: null,
  }); // <object>
  const [picutueId, setPictureId] = useState(null); // <null / string>
  const [proofOfAddress, setProofOfAddress] = useState(null); // <null | string>
  const [docTypes, setDocTypes] = useState({}); // <object>
  const [success, setSuccess] = useState(false); //<bollean>
  const ValidSize = 1048576; // <number>
  const { email } = props.match.params;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const main = useCallback(async (file, type) => {
    const result = await toBase64(file).catch((e) => Error(e));
    if (type === "PROOF_OF_ADDRESS") {
      setProofOfAddress({ type: type, document: result });
    } else if (type === "PICTURE_ID") {
      setPictureId({ type: type, document: result });
    }
  }, []);

  const onChangeHandler = useCallback(
    async (event) => {
  
      const { name } = event.target;
      let files = event.target.files[0];

      let ValidMIME = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "application/pdf",
      ];
      let localError = {};

      if (typeof files !== "undefined" && files.size > ValidSize) {
        localError = {
          MAX_FILE_SIZE: `File size exceeds. Maximum ${
            ValidSize / (1024 * 1024)
          } MB is allowed`,
        };
        setErrors({ ...errors, [name]: localError });
        return;
      } else {
        setErrors({ ...errors, [name]: null });
      }

      if (
        typeof files !== "undefined" &&
        ValidMIME.indexOf(files.type) === -1
      ) {
        localError = {
          INVALID_MIME_TYPE:
            "Please select following extensions (pdf, jpeg, png, jpg)",
        };
        setErrors({ ...errors, [name]: localError });
        return;
      } else {
        setErrors({ ...errors, [name]: null });
      }

      await main(files, event.target.name);
    },

    [errors, main]
  );

  const updateDocument = useCallback(
    (e) => {
      e.preventDefault();
      setProcessing(true);
      // Collect all information
      // Data structor for the REST API Is
      // [{type: type, doc: base64},]
      /*
    data:Array = [
       {type: string, doc: string},
       {type: type, doc: base64},
       idType: stirng,
       proofOfAddresstype: string
      ]
      [proofOfAddress,
      picutueId],
      {docTypes}
    */

      const restData = {
        clientEmail: email,
        docs: [proofOfAddress, picutueId],
        docTypes,
      };
      Service.post(endPoints.clients.uploadClientDocs, restData).then(response => {
        if(response.data.code === 200 && response.data.success === true) {
          setSuccess(true);
          setProofOfAddress(null);
          setPictureId(null);
          setDocTypes(null);
        } else {
          console.log('http request response returend failed, check the below');
          console.log(response.data);
        }
        setProcessing(false);
      }).catch(error => {
        console.log(`Something went wrong with http request ${error}`);
        console.log(`${endPoints.clients.uploadClientDocs}`);
        setProcessing(false);
      })
     ;
    },
    [proofOfAddress, picutueId, docTypes, email]
  );

  const selectOnChange = useCallback(
    (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setDocTypes({ ...docTypes, [name]: value });
    },
    [docTypes]
  );

  // get errors
  const getErrors = useCallback(
    (type) => {
      // Will return jxs if there is errors
      if (errors[type] !== null && Object.values(errors[type].length > 0)) {
        // Get the values
        const values = Object.values(errors[type]);
        // Check the length
        if (values.length > 0) {
          const jsXError = values.map((item, key) => {
            return (
              <p key={key} className="alert alert-danger-wf">
                {item}
              </p>
            );
          });
          return jsXError;
        }
        return null;
      }
      return null;
    },
    [errors]
  );

  const IsFormIsValid = useMemo(
    (e) => {
      if (
        errors.PROOF_OF_ADDRESS === null &&
        errors.PICTURE_ID === null &&
        proofOfAddress !== null &&
        picutueId !== null &&
        typeof docTypes.idType !== "undefined" &&
        typeof docTypes.proofOfAddressType !== "undefined"
      ) {
        return true;
      }
      return false;
    },
    [errors, picutueId, proofOfAddress, docTypes]
  );

  return (
    <Fragment>
      
      <Headerserver />
      <div className = "component__page">
      <div className="my__container">
        <div className="wrapper">
          <div className="initial__text">
            <h2>Upload Client identity</h2>
            <p>
              To proceed, we need you to upload Client official documents as
              proof of identity. Client information is fully encrypted and is
              only accessible by authorized representatives.
            </p>
          </div>
          {!success && <form onSubmit={(e) => updateDocument(e)}>
            <div className="grid__column">
              <h3>ID type</h3>
              <select
                className="wf__select"
                name="idType"
                onChange={(e) => selectOnChange(e)}
                defaultValue={docTypes.idType}
                required
              >
                <option value="">Please select an ID type</option>
                <option value="ID">Government issued Photo ID</option>
                <option value="driveLicense">Driving License ID</option>
                <option value="passport">Passport</option>
                <option value="voterCard">
                  Voters registration card with photo
                </option>
              </select>
              <p className="please__upload">
                Please upload a colored scanned document of Proof of address
                front side only!
              </p>
              <div className="please__not__container">
                <p>
                  <img src={exclamation} alt="Info" />
                </p>
                <p className="plese__note">
                  Please note, we do not accept black&white and color
                  photocopies, internet document(s), forged, altered, and
                  screenshots images due to the high risk of fraudulent
                  activities.
                </p>
              </div>

              <div className="filter__container">
                <input
                  name="PICTURE_ID"
                  type="file"
                  className="custom-file-input"
                  onChange={(e) => onChangeHandler(e)}
                  accept=".jpg,.png,.gif,.jpeg,.pdf image/jpg,image/png,image/gif,application/pdf"
                  max-size={ValidSize}
                ></input>
              </div>
              <p className="p__info">
                Maximum 2048 KB is allowed with the following extensions (pdf,
                jpeg, png, jpg)
              </p>
              {getErrors("PICTURE_ID")}
            </div>

            <div className="grid__column">
              <h3>Proof Of Address</h3>
              <select
                name="proofOfAddressType"
                className="wf__select"
                placeholder="Please select type of document"
                onChange={(e) => selectOnChange(e)}
                defaultValue={docTypes.proofOfAddressType}
                required
              >
                <option value="">Please select proof of address type</option>
                <option value="utilityBill">Utility bill</option>
                <option value="mobileBill">Mobile bill</option>
                <option value="bankStatement">
                  Bank or credit card statement
                </option>
                <option value="tenancyContract">Tenancy contract</option>
                <option value="titleDeed">Title deed</option>
                <option value="ejari">Ejari</option>
              </select>
              <p className="please__upload">
                Please upload a colored scanned document of Proof Of Address
                front side only!
              </p>
              <div className="please__not__container">
                <p>
                  <img src={exclamation} alt="Info" />
                </p>
                <p className="plese__note">
                  Please note, we do not accept black&white and color
                  photocopies, internet document(s), forged, altered, and
                  screenshots images due to the high risk of fraudulent
                  activities.
                </p>
              </div>

              <div className="filter__container">
                <input
                  name="PROOF_OF_ADDRESS"
                  type="file"
                  className="custom-file-input"
                  onChange={(e) => onChangeHandler(e)}
                  accept=".jpg,.png,.gif,.jpeg,.pdf image/jpg,image/png,image/gif,application/pdf"
                  max-size={ValidSize}
                ></input>
              </div>
              <p className="p__info">
                Maximum 2048 KB is allowed with the following extensions (pdf,
                jpeg, png, jpg)
              </p>
              {getErrors("PROOF_OF_ADDRESS")}
            </div>

            {IsFormIsValid && (
              <div className="btn__container">
               <button type="submit" className="upload__doc">
                  {!processing && 'Submit'} 
                  {processing && 'Please wait' &&  <div className="spinner-border text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>}
                 
                </button>
                
                

              </div>
            )}
          </form>
         }
          
         {success &&   <div className="grid__column">
              
              <h3 className="t__green">
                <i className="fa fa-check"></i> &nbsp; Document has been
                sucessfully uploaded.
              </h3>
            </div>
         
             }
          
          
        </div>
      </div>
      
      <Footer />
      </div>
    </Fragment>
  );
};

export default App;
