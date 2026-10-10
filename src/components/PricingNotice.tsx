/** Pricing terms for venues and vendors: free during the launch, then a paid monthly subscription. */
export function PricingNotice() {
  return (
    <div className="rounded-2xl border border-pine/30 bg-white p-5 sm:p-6">
      <p className="font-sans text-base font-semibold text-ink">Gratuit pendant le lancement, payant ensuite</p>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
        Le référencement est gratuit pendant la phase de lancement de l'annuaire. Il deviendra ensuite payant, sous forme
        d'abonnement mensuel. Avant ce changement, nous vous présenterons l'offre et les statistiques de votre fiche (vues,
        demandes de coordonnées), et vous resterez libre de continuer ou de retirer votre fiche.
      </p>
    </div>
  );
}
