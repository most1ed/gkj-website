package ports

// Repository is a generic interface for data access
type Repository[T any] interface {
    Create(item *T) error
    GetByID(id string) (*T, error)
    Update(id string, item *T) error
    Delete(id string) error
    List(filter map[string]interface{}) ([]T, error)
}
