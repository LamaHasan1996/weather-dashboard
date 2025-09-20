class NetworkError(Exception):
    """Network/HTTP issue when calling weather API."""

class StorageError(Exception):
    """File read/write problems for stores."""

class NotFoundError(Exception):
    """City not found in geocoding."""
