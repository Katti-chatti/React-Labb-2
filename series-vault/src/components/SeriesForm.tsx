type Props = {
  title: string;
  genre: string;
  seasons: number;
  description: string;

  onTitleChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onSeasonsChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;

  onFileChange: (file: File | null) => void;

  onSubmit: () => void;
};

function SeriesForm({
  title,
  genre,
  seasons,
  description,

  onTitleChange,
  onGenreChange,
  onSeasonsChange,
  onDescriptionChange,

  onFileChange,

  onSubmit,
}: Props) {
  return (
    <div className="series-form">

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
      />
      
      <div className="form-group">        
        <label> Number of seasons </label>        
        <input
        type="number"
        value={seasons}
        min={1}
        onChange={(e) =>
          onSeasonsChange(Number(e.target.value))
    }
  />

</div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          onDescriptionChange(e.target.value)
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            onFileChange(e.target.files[0]);
          }
        }}
      />

      <button onClick={onSubmit}>
        Add Series
      </button>

    </div>
  );
}

export default SeriesForm;