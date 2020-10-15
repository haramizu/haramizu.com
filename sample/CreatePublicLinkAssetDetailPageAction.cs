using Stylelabs.M.Sdk;

var entityId = Context.TargetId;

MClient.Logger.Info($"Creating public link for asset {entityId}.");

var publicLink = await MClient.EntityFactory.CreateAsync(Constants.PublicLink.DefinitionName).ConfigureAwait(false);
publicLink.SetPropertyValue(Constants.PublicLink.Resource, "preview");

// Link the public link to the asset
//var assetTopublicLinkRelation = publicLink.GetRelation(Constants.PublicLink.Relations.AssetToPublicLink, RelationRole.Child);
var assetTopublicLinkRelation = publicLink.GetRelation<IChildRelation>(Constants.PublicLink.AssetToPublicLink);
assetTopublicLinkRelation.SetIds(new long[] { entityId.Value });

// Save the public link
long publicLinkId = await MClient.Entities.SaveAsync(publicLink);

MClient.Logger.Info($"Public Link {publicLinkId} created.");