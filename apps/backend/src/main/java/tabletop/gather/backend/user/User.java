package tabletop.gather.backend.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tabletop.gather.backend.comment.Comment;
import tabletop.gather.backend.game.Game;
import tabletop.gather.backend.gathering.Gathering;
import tabletop.gather.backend.plan.Plan;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "Users")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @Column(nullable = false, updatable = false)
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "uuid")
    private UUID id;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false, unique = true, length = 320)
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<Plan> sessionplans;

    @ManyToMany
    @JoinTable(
            name = "UserGames",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "gameId")
    )
    private Set<Game> games;

    @OneToMany(mappedBy = "user")
    private Set<Comment> comments;

    @ManyToMany(mappedBy = "users")
    private Set<Gathering> gatherings;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  public String getPassword() {
    return passwordHash;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
