import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import "./BurgerConstructor.css";

const BurgerConstructor = () => {
  return (
    <section className="parent main-constr  pt-25">
      <section className="ingrs pl-4">
        <section className="top-ingr">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
        </section>

        <section className="scrollCm custom-scroll other-ingr ingrs">
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            isLocked={false}
            price={50}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
        </section>

        <section className="bot-ingr">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={
              "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
            }
          />
        </section>
      </section>

      <section className="flex-bb mb-10 pr-4">
        <section>
          <span className="cost mt-1 mb-1 mr-4 text text text_type_digits-medium ">
            1223
          </span>
        </section>
        <section className="mr-10">
          <CurrencyIcon type="primary" />
        </section>
        <section>
          <Button htmlType="button" type="primary" size="medium">
            Make an order
          </Button>
        </section>
      </section>
    </section>
  );
};

export default BurgerConstructor;
