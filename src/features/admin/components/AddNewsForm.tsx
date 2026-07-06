import { Megaphone, Plus } from "lucide-react";
import { SubmitEvent } from "react";

type AddNewsFormProps = {
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function AddNewsForm({ onSubmit }: AddNewsFormProps) {
  return (
    <form className="admin-panel" onSubmit={onSubmit}>
      <div className="panel-title">
        <Megaphone size={20} />
        <h3>Ajouter une actualite</h3>
      </div>
      <label>
        Titre
        <input name="title" placeholder="Titre de l'actualite" />
      </label>
      <label>
        Categorie
        <select name="category" defaultValue="Club">
          <option>Club</option>
          <option>Evenement</option>
          <option>Competition</option>
          <option>Vie du club</option>
        </select>
      </label>
      <label>
        Contenu
        <textarea
          name="description"
          placeholder="Resume visible sur le site"
          rows={4}
        />
      </label>
      <label>
        Photo depuis l'ordinateur
        <input name="imageFile" type="file" accept="image/*" />
      </label>
      <label>
        Ou URL d'image
        <input name="imageUrl" placeholder="https://..." type="url" />
      </label>
      <button className="primary-action full-width" type="submit">
        <Plus size={18} /> Publier
      </button>
    </form>
  );
}
