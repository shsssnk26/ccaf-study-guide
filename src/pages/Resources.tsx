import { COMMUNITY_RESOURCES, OFFICIAL_RESOURCES, type Resource } from "../data";

function ResourceList({ items }: { items: Resource[] }) {
  return (
    <ul className="rows">
      {items.map((r) => (
        <li className="row res" key={r.url}>
          <span className="id">{r.tag}</span>
          <div>
            <h3><a href={r.url} target="_blank" rel="noopener">{r.name}</a></h3>
            <p className="note">{r.by}</p>
            <p className="idea">{r.about}</p>
          </div>
          <div className="side"><a className="btn small" href={r.url} target="_blank" rel="noopener">Open</a></div>
        </li>
      ))}
    </ul>
  );
}

export function Resources() {
  return (
    <>
      <section className="lead">
        <h1>Resources</h1>
        <p>Free material beyond this site. Start with the official sources; the community ones add more practice once you are scoring well here.</p>
      </section>
      <section>
        <h2 className="h2">Official</h2>
        <ResourceList items={OFFICIAL_RESOURCES} />
      </section>
      <section>
        <h2 className="h2">Community (unofficial)</h2>
        <ResourceList items={COMMUNITY_RESOURCES} />
        <p className="note" style={{ marginTop: 12 }}>Community resources are independent and not affiliated with Anthropic or this site. We only list sites that write their own questions, never ones that share real exam content, which breaks the exam rules.</p>
      </section>
    </>
  );
}
