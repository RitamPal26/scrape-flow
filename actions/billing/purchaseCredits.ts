'use server';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { getAppUrl } from '@/lib/helper/appUrl';
import { stripe } from '@/lib/stripe/stripe';
import { PackId, getCreditsPack } from '@/types/billing';

export async function PurchaseCredits(packId: PackId) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthenticated !!');
  }

  const selectedPack = getCreditsPack(packId);
  if (!selectedPack) {
    throw new Error('Invalid pack !!');
  }
  const priceId = selectedPack.priceId;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl('billing'),
    cancel_url: getAppUrl('billing'),
    metadata: {
      userId,
      packId,
    },
    line_items: [
      {
        quantity: 1,
        price: selectedPack.priceId,
      },
    ],
  });

  if (!session.url) {
    throw new Error('Cannot create stripe session !!');
  }

  redirect(session.url);
}