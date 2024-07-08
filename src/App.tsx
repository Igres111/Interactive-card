import { useState } from "react";
import bg_mobile from "/images/bg-main-mobile.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
type Inputs = {
  name: string;
  number: string;
  month: string;
  year: string;
  cvc: string;
};

const cardRegex =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

function App() {
  const schema = yup.object({
    name: yup
      .string()
      .required("Can’t be blank")
      .max(30, "Can't be more digits"),
    number: yup
      .string()
      .required("Can’t be blank")
      .min(16, "Number must contain 16 digits"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-screen w-screen">
      <div>
        <img src={bg_mobile} />
      </div>
      <div>
        <h4>Cardholder Name</h4>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          {...register("name")}
        />
      </div>
      <div>
        <h4>Card Number</h4>
        <input
          type="string"
          placeholder="e.g. 1234 5678 9123 0000"
          {...register("number")}
        ></input>
      </div>
      <div>
        <h4>Exp. Date (MM/YY)</h4>
        <div>
          <input type="text" placeholder="MM" {...register("month")} />
          <input type="text" placeholder="YY" {...register("year")} />
        </div>
        <div>
          <h4>CVC</h4>
          <input type="text" placeholder="e.g. 123" {...register("cvc")} />
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
}

export default App;
