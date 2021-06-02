import { GetServerSideProps } from 'next';
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from '../services/stripe';
import formatCurrency from '../utils/formatCurrency';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string; 
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {  
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product?.amount} month</span>
          </p>
          <SubscribeButton priceId={product?.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girr coding" />
      </main>
    </>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID);

  const product = {
    priceId: price.id,
    amount: formatCurrency(price.unit_amount / 100),
  };

  return {
    props: {
      product
    }
  }
}