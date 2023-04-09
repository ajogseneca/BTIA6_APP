import { useAtom } from "jotai";
import { favouritesAtom } from '../store';
import { Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";


export default function FavouritesList() {
  const [favouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;
  if (favouritesList.length === 0) {
    return <p>Nothing here. Try adding some new artwork to the list.</p>;
  }
  return (
    <Row>
      {favouritesList.map((artwork) => (
        <Col lg key={artwork.objectID}>
          <ArtworkCard objectID={artwork} />
        </Col>
      ))}
    </Row>
  );
}

