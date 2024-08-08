import { FC } from 'react';

import SubscriptionCard, {
  SubscriptionCardProps,
} from '@/components/SubscriptionCard';

import { SubscriptionProducts } from '@/models/admin/admin.types';

interface CardProps extends Omit<SubscriptionCardProps, 'product'> {
  subscriptionProducts?: SubscriptionProducts;
}

const Cards: FC<CardProps> = ({ subscriptionProducts, onClick }) => {
  if (!subscriptionProducts) return <></>;

  const products = [
    subscriptionProducts.PAID_TIER_1_MONTH,
    subscriptionProducts.PAID_TIER_6_MONTHS,
    subscriptionProducts.PAID_TIER_12_MONTHS,
  ];

  return (
    <div className='grid grid-cols-2 gap-x-5 gap-y-5 justify-center items-center'>
      {products.map((product, index) => {
        if (!product) return null;
        const isLastOddItem =
          products.length % 2 !== 0 && index === products.length - 1;

        return (
          <div
            key={index}
            className={isLastOddItem ? 'col-span-2 flex justify-center' : ''}
          >
            <SubscriptionCard onClick={onClick} product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
