import { Link } from "react-router";

export function NotFound() {
  return (
    <section className="notfound">
      <h1 className="h2">Page not found</h1>
      <p className="muted">That page doesn't exist. It may have moved when the site was rebuilt.</p>
      <div className="actions"><Link className="btn primary" to="/">Go to the home page</Link></div>
    </section>
  );
}
