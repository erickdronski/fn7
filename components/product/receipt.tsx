/** A sample of the signed receipt every purchase will produce. Sample data, labeled as such. */
export function Receipt() {
  return (
    <article className="receipt" aria-label="Sample receipt">
      <header>
        <h3>Receipt</h3>
        <span className="mono">ord_7F3K2</span>
      </header>
      <dl>
        <dt>Release-notes skill, 1.2.0</dt>
        <dd className="mono num">$5.00</dd>
        <dt>Paid with</dt>
        <dd>USDC on Solana</dd>
        <dt>To the creator, @courier</dt>
        <dd className="mono num">4.50 USDC</dd>
        <dt>To fn/7</dt>
        <dd className="mono num">0.50 USDC</dd>
        <dt>Transaction</dt>
        <dd className="mono">5hG7…k2Qp</dd>
        <dt>Signature</dt>
        <dd>Ed25519, verified</dd>
      </dl>
      <footer>Sample data. One transaction pays both sides.</footer>
    </article>
  );
}
