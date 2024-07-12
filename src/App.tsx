import { useState } from "react";
import bg_mobile from "/images/bg-main-mobile.png";
import bg_desktop from "/images/bg-main-desktop.png";
import back_card from "/images/bg-card-back.png";
import front_card from "/images/bg-card-front.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";
import Congrats from "./Congrats";
import { useMediaQuery } from "@uidotdev/usehooks";
type Inputs = {
  name: string;
  number: string;
  month: string;
  year: string;
  cvc: string;
};

const currYear = Number(new Date().getFullYear().toString().slice(2));
const englishReg = /^[A-Za-z]+$/;

function App() {
  const [complete, setComplete] = useState<boolean>(false);

  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1024px)"
  );

  const schema = yup.object({
    name: yup
      .string()
      .required("Can’t be blank")
      .max(30, "Can't be more than 30 digits")
      .test("validation", "Must contain english letters", (value) =>
        englishReg.test(value)
      ),
    number: yup
      .string()
      .required("Can’t be blank")
      .min(19, "Number must contain 16 digits")
      .test(
        "validation",
        "Card number must be valid",
        (value) => !value.startsWith("5") || !value.startsWith("4")
      ),
    month: yup
      .string()
      .required("Can’t be blank")
      .test(
        "range",
        "Must be valid number",
        (value) => Number(value) > 0 && Number(value) <= 12
      ),
    year: yup
      .string()
      .required("Can’t be blank")
      .test(
        "validation",
        "Invalid year",
        (value) => Number(value) >= currYear && Number(value) <= currYear + 6
      ),
    cvc: yup.string().required("Can’t be blank"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = () => {
    setComplete((value) => !value);
  };
  const name = watch("name");
  const number = watch("number");
  const month = watch("month");
  const year = watch("year");
  const cvc = watch("cvc");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen w-screen  lg:flex  lg:items-center "
    >
      <div
        className="bg-cover bg-center h-[240px]  lg:w-[483px] pt-8 lg:relative lg:h-full  "
        style={{
          backgroundImage: `url(${
            isExtraLargeDevice ? bg_desktop : bg_mobile
          })`,
        }}
      >
        <div
          className="bg-cover bg-center w-[286px] lg:w-[447px] h-[157px] lg:h-[245px] ml-[73px] pr-[36px] lg:pr-[57px] flex items-center justify-end lg:absolute bottom-[186px]  right-[-223px] "
          style={{ backgroundImage: `url(${back_card})` }}
        >
          <span className="text-white text-[9px] font-medium tracking-widest lg:text-[14px] ">
            {!cvc ? "000" : cvc}
          </span>
        </div>
        <div
          className="bg-cover bg-center w-[285px] lg:w-[447px] h-[156px] lg:h-[245px] ml-[17px] absolute mt-[120px] lg:top-[125px] lg:ml-[164px] "
          style={{ backgroundImage: `url(${front_card})` }}
        >
          <svg
            className="ml-5 mt-3"
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

          <p className="pt-[37px] lg:pt-[64px] ml-5 lg:ml-8 text-white tracking-widest lg:text-[28px]">
            {!number ? "0000 0000 0000 0000" : number}
          </p>
          <div className="flex justify-between pt-4 lg:pt-[40px] text-[9px] font-medium text-white lg:text-[14px]">
            <p className="ml-5 tracking-widest lg:ml-8">
              {!name ? "JANE APPLESEED" : name.toUpperCase()}
            </p>

            <p className="mr-5 tracking-widest lg:mr-[26px]">
              {month ? month : "00"}/{year ? year : "00"}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:pl-[343px]">
        {complete ? (
          <Congrats />
        ) : (
          <div className="ml-6">
            <div className="mt-[91px]">
              <h4 className="text-Deep-Violet text-xs tracking-widest	">
                CARDHOLDER NAME{" "}
              </h4>
              <input
                className={`mt-[9px] border rounded-lg w-[327px] h-[45px] pl-4 focus:outline-Deep-Violet ${
                  errors.name ? "border-errors" : "border-Deep-Violet"
                }`}
                type="text"
                placeholder="e.g. Jane Appleseed"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-2 text-errors text-xs ">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mt-5">
              <h4 className="text-Deep-Violet text-xs tracking-widest	">
                CARD NUMBER
              </h4>
              <InputMask
                className={`mt-[9px] border rounded-lg w-[327px] h-[45px] pl-4 focus:outline-none ${
                  errors.number ? "border-errors" : "border-Deep-Violet"
                }`}
                mask="9999 9999 9999 9999"
                maskChar=""
                type="string"
                placeholder="e.g. 1234 5678 9123 0000"
                {...register("number")}
              />
              {errors.number && (
                <p className="mt-2 text-errors text-xs">
                  {errors.number.message}
                </p>
              )}
            </div>
            <div className="mt-5 flex ">
              <div className="flex flex-col">
                <h4 className="text-Deep-Violet text-xs tracking-widest	">
                  EXP. DATE (MM/YY)
                </h4>
                <div className="flex mt-[9px]">
                  <InputMask
                    className={`w-[72px] h-[45px] pl-4 border rounded-lg focus:outline-none ${
                      errors.month ? "border-errors" : "border-Deep-Violet"
                    }`}
                    mask="99"
                    maskChar=""
                    type="text"
                    placeholder="MM"
                    {...register("month")}
                  />

                  <InputMask
                    className={`w-[72px] h-[45px] pl-4 border rounded-lg ml-2 mr-[11px] focus:outline-none ${
                      errors.year ? "border-errors" : "border-Deep-Violet"
                    }`}
                    mask="99"
                    maskChar=""
                    type="text"
                    placeholder="YY"
                    {...register("year")}
                  />
                </div>
                {errors.month ? (
                  <p className="mt-2 text-errors text-xs">
                    {errors.month.message}
                  </p>
                ) : errors.year ? (
                  <p className="mt-2 text-errors text-xs">
                    {errors.year.message}
                  </p>
                ) : null}
              </div>
              <div>
                <h4 className="text-Deep-Violet text-xs tracking-widest 	">
                  CVC
                </h4>
                <InputMask
                  className={`border rounded-lg mt-[9px] w-[164px] h-[45px] pl-4 focus:outline-none ${
                    errors.cvc ? "border-errors" : "border-Deep-Violet"
                  }`}
                  mask="999"
                  maskChar=""
                  type="text"
                  placeholder="e.g. 123"
                  {...register("cvc")}
                />
                {errors.cvc && (
                  <p className="mt-2 text-errors text-xs">
                    {errors.cvc.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {!complete && (
          <button
            type="submit"
            className="mt-7 w-[327px] h-[53px] text-white bg-Deep-Violet ml-6 border rounded-lg "
          >
            Confirm
          </button>
        )}
      </div>
    </form>
  );
}

export default App;
