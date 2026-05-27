import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const Container = styled.div`
    padding: 0;

    label {
        display: none;
    }

    form {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    form input {
        background-color: white;
        padding: 5px 15px;
        border: 1px solid rgb(150, 150, 150);
        height: 40px;
        width: 240px;
        font-family: "Barlow Condensed Medium";
        font-size: 1.2rem;
    }

    @media(max-width: 600px) {
        form {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
        }

        form input {
            width: 100%;
            border-right: 1px solid rgb(150, 150, 150);
            margin-bottom: 10px;
        }

        button {
            margin-left: 0 !important;
            width: 100%;
            text-align: center;
        }
    }

    form input::placeholder {
        color: rgb(150, 150, 150);
        font-family: "Barlow Condensed Medium";
        font-size: 1.2rem;
    }

    form input:focus {
        outline: none;
    }

    .text-input.error {
        border: 1px solid red;
    }

    .error-label {
        display: none;
    }

    button {
        -webkit-appearance: none;
        background: black;
        color: white;
        border: 1px solid black;
        padding: 0 20px;
        height: 40px;
        font-family: "Barlow Condensed Medium";
        font-size: 1.1rem;
        white-space: nowrap;
        cursor: pointer;
        margin-left: 10px;
    }

    button:hover {
        background: white !important;
        color: black !important;
    }
`;

const Input = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Input>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className={meta.touched && meta.error ? "text-input error" : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error-label">{meta.error}</div>
      ) : null}
    </Input>
  );
};

const Submit = ({ children, ...props}) => {
    const {isValid, touched } = useFormikContext();
    return (
        <button type="submit" id="submit-button">
            {children}
        </button>
    )
}

const SignupForm = ({ data }) => {

  const addEmailToList = async (values) => {
    if (!values.email) return
    let dataObj = { email: values.email }

    try {
      const res = await fetch("/api/subscribe", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(dataObj)
      })
      .then((response) => response.json())
      .then(data => {
        if (data.result !== "error") {
          document.querySelectorAll(".text-input").forEach(item => {
            item.value = "";
            document.querySelector("#submit-button").innerText = "✓"
          })
        } else {
          const msg = data.error?.errors?.[0]?.description
            || data.error?.description
            || "Error"
          document.querySelector("#submit-button").innerText = msg
        }
      })
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Container>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          addEmailToList(values);
        }}
      >
        <Form>
          <MyTextInput
            label={data?.emailPlaceholder}
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
