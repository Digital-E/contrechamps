import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

// import Button from "./button"


const Container = styled.div`

    padding: 0;
    width: fit-content;

    margin: 70px 0 30px 0;

    label {
      text-transform: lowercase;
      display: none;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    form input {
        background-color: rgb(237, 237, 237);
        padding: 5px 25px;
        border: 1px solid transparent;
        height: 40px;
        text-align: center;
    }

    form input::placeholder {
        color: black;
    }

    form input:focus {
        outline: none;
        border: 1px solid black;
    }

    .text-input {
        width: 100%;
    }

    .text-input.error {
        border: 1px solid red;
    }

    .error-label {
      position: absolute;
      right: 10px;
      color: var(--ternary-color);
    }


    .checkbox {
        display: flex;
        // align-items: center;
        margin-bottom: 15px;
        cursor: pointer;
    }

    .checkbox > input {
        height: 15px;
        width: 15px;
        min-height: 15px;
        min-width: 15px;
        border-radius: 999px;
        -webkit-appearance: none;
        border: 1px solid #AC9E95;
        margin-right: 25px;
    }

    .checkbox > input:checked {
        background: #b0b0b0;
    }

    button {
        -webkit-appearance: none;
        border: none;
        background: none;
        width: fit-content;
        height: fit-content;
        border: 1px solid black;
        padding: 5px 25px;
        height: 40px;
        text-transform: uppercase;
    }

    .disabled {
        // pointer-events: none;
        // opacity: 0.3;
    }
`;

const Input = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    margin-bottom: 10px;
    align-items: center;

    > label:nth-child(1) {
      flex-basis: 23%;
    }

    > div:nth-child(2) {
      flex-basis: 77%;
    }

    @media(max-width: 989px) {
      > label:nth-child(1) {
        flex-basis: 35%;
      }

      > div:nth-child(2) {
        flex-basis: 65%;
      }
    }
`




const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <Input>
      <label htmlFor={props.id || props.name} className="medium-font-size">{label}*</label>
      <input className={meta.touched && meta.error ? "text-input error medium-font-size" : "text-input medium-font-size"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </Input>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    let isActive = false

    if(isValid === true && Object.entries(touched).length !== 0) {
        isActive = true
    } else {
        isActive = false
    }


    return (
        <button type="submit" id="submit-button" className={isActive ? null : "disabled"}>
            {children}
        </button>
    )
}

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

// And now we can use these
const SignupForm = ({ data }) => {

  const addEmailToList = async (values) => {
    let dataObj = {
      email: values.email,
    }

  try {
      const res = await fetch("/api/subscribe", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(dataObj)
      })
      .then((response) => response.json())
      .then(data => {
        if(data.result !== "error") {
          document.querySelectorAll(".text-input").forEach(item => {
            item.value="";
            document.querySelector("#submit-button").innerText = "✓"
            // item.placeholder="Thanks for subscribing!";
          })
        } else {
          document.querySelectorAll(".text-input").forEach(item => {
            item.value="";
            document.querySelector("#submit-button").innerText = data.error
            // item.placeholder = data.message;
          })
        }
      })
    } catch (error) {
          alert(error);
    }
  }

  return (
    <Container>
      <Formik
        initialValues={{
          surname: "",
          name: "",
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid")
            // .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          // await new Promise(r => setTimeout(r, 500));
          // setSubmitting(false);
          addEmailToList(values);
        }}
      >
        <Form>                         
            <MyTextInput
            label={data?.text_three}
            name="email"
            type="email"
            placeholder={data?.emailPlaceholder}
            />       
            <Submit>{data?.submitButtonText}</Submit>
        </Form>
      </Formik>
    </Container>
  );
};

export default SignupForm
