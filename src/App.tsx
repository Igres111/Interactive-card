import { useState } from "react";
import bg_mobile from "/images/bg-main-mobile.png";
import back_card from "/images/bg-card-back.png";
import front_card from "/images/bg-card-front.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
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
    month: yup
      .string()
      .required("Can’t be blank")
      .test(
        "range",
        "must be valid number",
        (value) => Number(value) > 0 && Number(value) <= 12
      ),
    year: yup.string().required("Can’t be blank"),
    cvc: yup.string().required("Can’t be blank"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-screen w-screen">
      <div
        className="bg-cover bg-center h-[240px] pt-8  "
        style={{ backgroundImage: `url(${bg_mobile})` }}
      >
        <div
          className="bg-cover bg-center w-[286px] h-[157px] ml-[73px] pr-[36px] flex items-center justify-end"
          style={{ backgroundImage: `url(${back_card})` }}
        >
          <span className="text-white text-[9px] font-medium"> 00000</span>
        </div>
        <div
          className="bg-cover bg-center w-[285px] h-[156px] ml-[17px] absolute top-0 mt-[127px] "
          style={{ backgroundImage: `url(${front_card})` }}
        >
          <svg
            className="ml-5 mt-4"
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="30"
            viewBox="0 0 54 30"
            fill="none"
          >
            <ellipse cx="15.0932" cy="15" rx="15.0932" ry="15" fill="white" />
            <path
              d="M53.5 15C53.5 18.4489 50.6859 21.25 47.2081 21.25C43.7302 21.25 40.9161 18.4489 40.9161 15C40.9161 11.5511 43.7302 8.75 47.2081 8.75C50.6859 8.75 53.5 11.5511 53.5 15Z"
              stroke="white"
            />
          </svg>

          <p className="pt-[37px] ml-5 text-white">12312312</p>
          <div className="flex justify-between pt-4 text-[9px] font-medium text-white">
            <p className="ml-5">name</p>
            <p className="mr-5">expiry</p>
          </div>
        </div>
      </div>
      <div className="ml-6">
        <div className="mt-[91px]">
          <h4 className="text-Deep-Violet text-xs tracking-widest	">
            CARDHOLDER NAME{" "}
          </h4>
          <input
            className="mt-[9px] border rounded-lg w-[327px] h-[45px] pl-4"
            type="text"
            placeholder="e.g. Jane Appleseed"
            {...register("name")}
          />
        </div>
        <div className="mt-5">
          <h4 className="text-Deep-Violet text-xs tracking-widest	">
            CARD NUMBER
          </h4>
          <InputMask
            className="mt-[9px] border rounded-lg w-[327px] h-[45px] pl-4"
            mask="9999 9999 9999 9999"
            maskChar=""
            type="string"
            placeholder="e.g. 1234 5678 9123 0000"
            {...register("number")}
          />
        </div>
        <div className="mt-5 flex ">
          <div className="flex flex-col">
            <h4 className="text-Deep-Violet text-xs tracking-widest	">
              EXP. DATE (MM/YY)
            </h4>
            <div className="flex mt-[9px]">
              <InputMask
                className="w-[72px] h-[45px] pl-4 border rounded-lg"
                mask="99"
                maskChar=""
                type="text"
                placeholder="MM"
                {...register("month")}
              />
              <InputMask
                className="w-[72px] h-[45px] pl-4 border rounded-lg ml-2 mr-[11px]"
                mask="9999"
                maskChar=""
                type="text"
                placeholder="YY"
                {...register("year")}
              />
            </div>
          </div>
          <div>
            <h4 className="text-Deep-Violet text-xs tracking-widest	">CVC</h4>
            <InputMask
              className="border rounded-lg mt-[9px] w-[164px] h-[45px] pl-4"
              mask="999"
              maskChar=""
              type="text"
              placeholder="e.g. 123"
              {...register("cvc")}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-7 w-[327px] h-[53px] text-white bg-Deep-Violet ml-6 border rounded-lg "
      >
        Confirm
      </button>
    </form>
  );
}

export default App;
