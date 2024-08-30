// Cards.tsx
import { FC } from 'react';

import SubscriptionCard, {
  SubscriptionCardProps,
} from '@/components/SubscriptionCard';

import { SubscriptionProductsDetails } from '@/models/admin/admin.types';

interface CardProps extends Omit<SubscriptionCardProps, 'product'> {
  products: SubscriptionProductsDetails[];
}

const Cards: FC<CardProps> = ({ products, onClick }) => {
  return (
    <div className='grid grid-cols-2 gap-x-5 gap-y-5 justify-center items-center'>
      {products.map((product, index) => {
        if (!product) return null;
        const isLastOddItem =
          products.length % 2 !== 0 && index === products.length - 1;

        return (
          <div
            key={product.planId}
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
