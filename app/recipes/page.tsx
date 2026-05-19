const recipes = [
  {
    title: "Sticky Sweet Heat Wings",
    sauce: "Sweet Heat",
    time: "45 minutes",
    steps: [
      "Season wings with salt, pepper, garlic powder, and smoked paprika.",
      "Bake or smoke until cooked through and crisp at the edges.",
      "Toss with warmed Sweet Heat sauce and finish over high heat for 3 minutes."
    ]
  },
  {
    title: "Original Pitmaster Pulled Pork Sandwiches",
    sauce: "Original Pitmaster",
    time: "20 minutes after pork is cooked",
    steps: [
      "Warm pulled pork with a splash of apple cider vinegar.",
      "Fold in Original Pitmaster sauce until glossy.",
      "Serve on buns with slaw, pickles, and extra sauce on the side."
    ]
  },
  {
    title: "Smoky Gold Grilled Chicken",
    sauce: "Smoky Gold",
    time: "35 minutes",
    steps: [
      "Season chicken thighs and grill over medium heat.",
      "Brush with Smoky Gold during the last 10 minutes of cooking.",
      "Rest for 5 minutes, then serve with grilled vegetables."
    ]
  }
];

export default function RecipesPage() {
  return (
    <section className="section">
      <div className="page-heading">
        <p className="eyebrow">Recipes</p>
        <h1>Simple ways to use each sauce.</h1>
        <p>
          These are public starter recipes. They can become customer-only later
          if you add accounts and purchase tracking.
        </p>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <article className="recipe-card" key={recipe.title}>
            <p className="eyebrow">{recipe.sauce}</p>
            <h2>{recipe.title}</h2>
            <p>{recipe.time}</p>
            <ol>
              {recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
