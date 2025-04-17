import { getWixClient } from '@app/hooks//useWixClientServer';
import { wixEventsV2 as wixEvents } from '@wix/events';
import { products } from '@wix/stores';
import { HomeScreen } from '@app/components/HomeScreen/HomeScreen';

export default async function Home() {
  const wixClient = await getWixClient();
  let productsForCategories: { category: string; product: products.Product }[] =
    [];
  try {
    const { items: collectionsItems } = await wixClient.collections
      .queryCollections()
      .ne('_id', '00000000-000000-000000-000000000001')
      .limit(3)
      .find();
    productsForCategories = await Promise.all(
      collectionsItems.map((collection) =>
        wixClient.products
          .queryProducts()
          .eq('collectionIds', collection._id)
          .limit(1)
          .find()
          .then((products) => ({
            product: products.items[0],
            category: collection.name!,
          }))
      )
    );
  } catch (e) {}

    const testEvent: wixEvents.V3Event = {
    _id: "event123", // ID de l'événement
      location: {
        address: "1234 Rue des Tests, Paris, France",
        lat: 48.8566,
        lng: 2.3522,
      },

      dateAndTimeSettings: {
      startDate: new Date("2023-11-25T10:00:00Z"), // Date et heure de début
      endDate: new Date("2023-11-25T12:00:00Z"), // Date et heure de fin
    },
    title: "Événement de Test", // Titre de l'événement
    shortDescription: "Un événement pour tester les fonctionnalités", // Courte description
    detailedDescription: null, // Champ déprécié, défini à null
    description: {
      nodes: [],
    },
    mainImage: "https://via.placeholder.com/300x200.png?text=Image+de+l'%C3%A9v%C3%A9nement",
    slug: "evenement-de-test", // Slug généré automatiquement
    _createdDate: new Date(), // Date de création
    _updatedDate: new Date(), // Date de mise à jour
    status: wixEvents.Status.UPCOMING, // Statut de l'événement parmi [UPCOMING, STARTED, ENDED, CANCELED, DRAFT]
    registration: {

    },
    calendarUrls: {
      google: "https://calendar.google.com/event?eid=unique_id",
      ics: "https://example.com/download/ics",
    },
    eventPageUrl: "https://example.com/evenement-de-test",
  };

  let events: wixEvents.V3Event[] = [
    testEvent
  ];
  try {
      /*
    events = (
      await wixClient.wixEvents
        .queryEvents({
          fields: [wixEvents.RequestedFields.DETAILS],
        })
        .limit(10)
        .ascending('dateAndTimeSettings.startDate')
        .find()
    ).items;
       */
  } catch (e) {}
  return (
    <HomeScreen events={events} productsForCategories={productsForCategories} />
  );
}
